<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;

use App\Models\Library;


class LibraryController extends Controller
{
    public function index()
    {
        return Library::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'email' => 'nullable|email',
        ]);

        return Library::create($validated);
    }

    public function show($id)
    {
        return Library::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $library = Library::findOrFail($id);

        $library->update($request->only(['name', 'address', 'email']));

        return $library;
    }

    public function destroy($id)
    {
        Library::destroy($id);

        return response()->noContent();
    }
}