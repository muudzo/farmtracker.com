<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    //define the fillable fields
    protected $fillable = [
        'number', 'species', 'birthdate', 'breed', 'status'
    ];
//define the date fields
    protected $dates = ['birthdate'];
}
