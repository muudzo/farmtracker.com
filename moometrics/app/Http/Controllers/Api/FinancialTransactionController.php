<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FinancialTransactionController extends Controller
{
    public function index()
    {
        return FinancialTransaction::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'transaction' => 'required|string',
            'amount' => 'required|numeric'
        ]);

        $transaction = FinancialTransaction::create($validatedData);
        return response()->json($transaction, 201);
    }
}
