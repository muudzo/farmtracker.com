<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vaccine extends Model
{
    protected $fillable = [
        'vaccine', 'date', 'administered_by'
    ];

    protected $dates = ['date'];
}
