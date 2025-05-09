<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up()
{
    Schema::create('financial_transactions', function (Blueprint $table) {
        $table->id();
        $table->string('transaction');
        $table->decimal('amount', 10, 2);
        $table->date('date');
}

    public function down(): void
    {
        Schema::dropIfExists('financial_transactions');
    }
};
