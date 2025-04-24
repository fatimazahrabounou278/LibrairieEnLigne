<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function checkout(Request $request)
{
    $userId = $request->user()->id;

    $cartItems = Cart::where('user_id', $userId)->get();

    if ($cartItems->isEmpty()) {
        return response()->json(['message' => 'Panier vide'], 400);
    }

    DB::beginTransaction();

    try {
        $order = Order::create([
            'user_id' => $userId,
            'total' => 0, // on calcule après
        ]);

        $total = 0;

        foreach ($cartItems as $item) {
            $book = Book::findOrFail($item->book_id);

            if ($book->stock < $item->quantity) {
                throw new \Exception("Stock insuffisant pour le livre : $book->title");
            }

            $book->stock -= $item->quantity;
            $book->save();

            $itemTotal = $book->price * $item->quantity;
            $total += $itemTotal;

            OrderItem::create([
                'order_id' => $order->id,
                'book_id' => $book->id,
                'quantity' => $item->quantity,
                'price' => $book->price,
            ]);
        }

        $order->total = $total;
        $order->save();

        Cart::where('user_id', $userId)->delete();

        DB::commit();

        return response()->json(['message' => 'Commande validée', 'order_id' => $order->id]);
    } catch (\Exception $e) {
        DB::rollback();
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
public function history(Request $request)
{
    $userId = $request->user()->id;

    $orders = Order::with('orderItems.book')
        ->where('user_id', $userId)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($orders);
}

    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.book_id' => 'required|exists:books,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            // Création de la commande
            $order = Order::create([
                'user_id' => auth()->id(), // Si tu as un système d'authentification
                'total' => 0, // sera mis à jour plus tard
            ]);

            $total = 0;

            foreach ($request->items as $item) {
                $book = Book::findOrFail($item['book_id']);

                if ($book->stock < $item['quantity']) {
                    throw new \Exception("Stock insuffisant pour le livre : {$book->title}");
                }

                // Décrémenter le stock
                $book->stock -= $item['quantity'];
                $book->save();

                // Ajouter l'élément à la commande
                OrderItem::create([
                    'order_id' => $order->id,
                    'book_id' => $book->id,
                    'quantity' => $item['quantity'],
                    'price' => $book->price,
                ]);

                $total += $book->price * $item['quantity'];
            }

            // Mise à jour du total
            $order->update(['total' => $total]);

            DB::commit();

            return response()->json([
                'message' => 'Commande créée avec succès',
                'order' => $order->load('items.book'),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur lors de la création de la commande',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}