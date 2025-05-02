<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
public function up()
{
    Schema::create('book_library', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('book_id');
    $table->unsignedBigInteger('library_id');

    $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
    $table->foreign('library_id')->references('id')->on('libraries')->onDelete('cascade');

    $table->timestamps();
});

 
}

public function down()
{
    Schema::dropIfExists('book_library');
}

};