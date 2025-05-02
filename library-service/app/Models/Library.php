<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Library extends Model
{
   protected $fillable = ['name', 'address', 'email'];
// app/Models/Library.php

public function books()
{
    return $this->belongsToMany(Book::class, 'book_library');
}

}