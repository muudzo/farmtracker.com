<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AnimalController;
use App\Http\Controllers\Api\FinancialTransactionController;
use App\Http\Controllers\Api\VaccineController;



// Animal routes
Route::get('/animals', [AnimalController::class, 'index']);
Route::post('/animals', [AnimalController::class, 'store']);

// Financial transaction routes
Route::get('/transactions', [FinancialTransactionController::class, 'index']);
Route::post('/transactions', [FinancialTransactionController::class, 'store']);

// Vaccine routes
Route::get('/vaccines', [VaccineController::class, 'index']);
Route::post('/vaccines', [VaccineController::class, 'store']);

// Default route for API
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('animals', AnimalController::class);