<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VaccineController extends Controller
{
    public function index()
    {
        return Vaccine::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'vaccine' => 'required|string',
            'date' => 'required|date'
        ]);

        $vaccine = Vaccine::create($validatedData);
        return response()->json($vaccine, 201);
    }
}
