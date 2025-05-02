<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LibraryController;

Route::apiResource('libraries', LibraryController::class);
Route::get('/', function () {
    return view('welcome');
});