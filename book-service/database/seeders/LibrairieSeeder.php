<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Librairie;

class LibrairieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $librairies = [
            [
                'nom' => 'Librairie Centrale',
                'adresse' => '123 Rue Principale, Casablanca',
            ],
            [
                'nom' => 'Bibliopolis',
                'adresse' => '45 Avenue des Écoles, Rabat',
            ],
            [
                'nom' => 'Savoirs & Co',
                'adresse' => '9 Bd de la Connaissance, Marrakech',
            ],
            [
                'nom' => 'Papyrus Librairie',
                'adresse' => '101 Rue du Livre, Fès',
            ],
        ];

        foreach ($librairies as $librairie) {
            Librairie::create($librairie);
        }
    }
}
