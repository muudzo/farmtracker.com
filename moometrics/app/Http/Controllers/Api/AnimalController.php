<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Animal; // Add this import

class AnimalController extends Controller
{
    public function index()
    {
        return Animal::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'number' => 'required|string', // Changed from 'name' to 'number' to match model
            'species' => 'required|string',
            'birthdate' => 'nullable|date',
            'breed' => 'nullable|string',
            'status' => 'nullable|string'
        ]);

        $animal = Animal::create($validatedData);
        return response()->json($animal, 201);
    }
}