<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // ✅ Récupérer tous les livres (avec filtres possibles)
    public function index(Request $request)
    {
        $query = Book::with('libraries');

        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        return response()->json($query->get());
    }

    // ✅ Ajouter un nouveau livre
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'category' => 'nullable|string',
            'library_id' => 'nullable|exists:libraries,id',
        ]);

        $book = Book::create($validated);

        // ✅ Lier le livre à une librairie (relation many-to-many)
        if ($request->has('library_id')) {
            $book->libraries()->attach($request->library_id);
        }

        return response()->json($book, 201);
    }

    // ✅ Afficher les détails d’un livre
    public function show($id)
    {
        $book = Book::with('libraries')->findOrFail($id);
        return response()->json($book);
    }

    // ✅ Mettre à jour un livre
    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'author' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
            'stock' => 'sometimes|required|integer|min:0',
            'description' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        $book->update($validated);

        return response()->json($book);
    }

    // ✅ Supprimer un livre
    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();
        return response()->json(['message' => 'Livre supprimé']);
    }

    // ✅ Vue Blade (si utilisée côté web)
    public function bladeIndex(Request $request)
    {
        $query = Book::where('stock', '>', 0);

        if ($request->filled('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        $books = $query->get();

        return view('books.index', compact('books'));
    }

    // ✅ Filtrage via API
    public function filter(Request $request)
    {
        $query = Book::query();

        if ($request->filled('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        return response()->json($query->get());
    }

    // ✅ Liste tous les livres avec leurs librairies associées
    public function getBooksWithLibraries()
    {
        return Book::with('libraries')->get();
    }
}
