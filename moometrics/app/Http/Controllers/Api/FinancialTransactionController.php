<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FinancialTransaction;

class FinancialTransactionController extends Controller
{
    //validate the request and create a new financial transaction record
    public function index()
    {
        return FinancialTransaction::all();
    }
//create new record
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'transaction' => 'required|string',
            'amount' => 'required|numeric'
        ]);

        $transaction = FinancialTransaction::create($validatedData);
        //return the new record
        return response()->json($transaction, 201);
    }
}
