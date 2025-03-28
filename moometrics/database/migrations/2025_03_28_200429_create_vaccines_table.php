<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('vaccines', function (Blueprint $table) {
            $table->id();
            $table->string('vaccine');
            $table->date('date');
            $table->administered_by();
            
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('vaccines');
    }
};
