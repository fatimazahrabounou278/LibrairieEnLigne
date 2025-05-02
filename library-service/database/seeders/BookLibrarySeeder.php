<?php
use Illuminate\Database\Seeder;
use App\Models\Book;
use App\Models\Library;

class BookLibrarySeeder extends Seeder
{
    public function run()
    {
        $book1 = Book::where('title', 'Le Petit Prince')->first();
        $book2 = Book::where('title', '1984')->first();

        $lib1 = Library::where('name', 'Librairie Casablanca')->first();
        $lib2 = Library::where('name', 'Librairie Rabat')->first();

        $book1->libraries()->attach([$lib1->id, $lib2->id]);
        $book2->libraries()->attach($lib1->id);
    }
}