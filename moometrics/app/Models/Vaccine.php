<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vaccine extends Model
{
    //define the fillable fields
    protected $fillable = [
        'vaccine', 'date', 'administered_by'
    ];
//define the date fields
    protected $dates = ['date'];
}
