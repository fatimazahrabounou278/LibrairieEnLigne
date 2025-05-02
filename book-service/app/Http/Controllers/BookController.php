<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
 public function index(Request $request)
{
    $query = Book::with('libraries'); // ← AJOUT ICI

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

    return $query->get();
}


public function bladeIndex(Request $request)
{
    $query = Book::where('stock', '>', 0); // on limite aux livres en stock

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


    public function show($id)
    {
        $book = Book::findOrFail($id);
        return response()->json($book);
    }

    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);
        $book->update($request->all());
        return response()->json($book);
    }

    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();
        return response()->json(['message' => 'Livre supprimé']);
    }
    


}