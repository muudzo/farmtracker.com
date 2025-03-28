<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    protected $fillable = [
        'number', 'species', 'birthdate', 'breed', 'status'
    ];

    protected $dates = ['birthdate'];
}
