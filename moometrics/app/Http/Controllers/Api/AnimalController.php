<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    public function index()
    {
        return Animal::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'species' => 'required|string',
            'birthdate' => 'nullable|date',
            'breed' => 'nullable|string'
        ]);

        $animal = Animal::create($validatedData);
        return response()->json($animal, 201);
    }
}
