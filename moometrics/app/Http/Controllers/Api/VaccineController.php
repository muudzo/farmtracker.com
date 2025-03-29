<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vaccine; 

class VaccineController extends Controller
{
    //validate the request and create a new vaccine record
    public function index()
    {.
        return Vaccine::all();
    }
//create new record
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'vaccine' => 'required|string',
            'date' => 'required|date'
        ]);
/
        $vaccine = Vaccine::create($validatedData);
        //return the new record
        return response()->json($vaccine, 201);
    }
}
