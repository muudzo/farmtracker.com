<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialTransaction extends Model
{
    //define the fillable fields
    protected $fillable = [
        'transaction', 'amount' , 'date'
    ];
}
