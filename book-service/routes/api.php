<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
Route::get('/books/filter', [BookController::class, 'filter']);
Route::post('/orders', [OrderController::class, 'store']);

Route::apiResource('books', BookController::class);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::post('/cart/remove', [CartController::class, 'remove']);
});
Route::get('/books-with-libraries', [BookController::class, 'getBooksWithLibraries']);


Route::middleware('auth:sanctum')->post('/orders/checkout', [OrderController::class, 'checkout']);
Route::middleware('auth:sanctum')->get('/orders/history', [OrderController::class, 'history']);