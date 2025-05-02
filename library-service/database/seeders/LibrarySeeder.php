<?php

use Illuminate\Database\Seeder;
use App\Models\Library;

class LibrarySeeder extends Seeder
{
    public function run()
    {
        Library::create(['name' => 'Librairie Casablanca']);
        Library::create(['name' => 'Librairie Rabat']);
    }
}