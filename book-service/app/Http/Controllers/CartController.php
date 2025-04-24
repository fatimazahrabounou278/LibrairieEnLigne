<?php

use App\Models\Cart;
use App\Models\Book;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // Voir le panier
    public function index(Request $request)
    {
        $cart = Cart::with('book')->where('user_id', $request->user()->id)->get();
        return response()->json($cart);
    }

    // Ajouter un livre
    public function add(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = Cart::where('user_id', $request->user()->id)
                        ->where('book_id', $request->book_id)
                        ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            Cart::create([
                'user_id' => $request->user()->id,
                'book_id' => $request->book_id,
                'quantity' => $request->quantity,
            ]);
        }

        return response()->json(['message' => 'Livre ajouté au panier']);
    }

    // Supprimer un livre
    public function remove(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);

        Cart::where('user_id', $request->user()->id)
            ->where('book_id', $request->book_id)
            ->delete();

        return response()->json(['message' => 'Livre supprimé du panier']);
    }
}