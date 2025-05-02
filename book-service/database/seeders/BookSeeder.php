<?php

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    public function run()
    {
        Book::create(['title' => 'Le Petit Prince', 'author' => 'Antoine de Saint-Exupéry', 'price' => 10, 'stock' => 20]);
        Book::create(['title' => '1984', 'author' => 'George Orwell', 'price' => 12, 'stock' => 15]);
    }
}