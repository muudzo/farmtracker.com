
<?php
public function up()
{
    Schema::create('animals', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('species');
        $table->date('birthdate')->nullable();
        $table->string('breed')->nullable();
        $table->string('status')->default('Healthy');
        $table->timestamps();
    });
}

// database/migrations/YYYY_MM_DD_create_financial_transactions_table.php
public function up()
{
    Schema::create('financial_transactions', function (Blueprint $table) {
        $table->id();
        $table->string('transaction');
        $table->decimal('amount', 10, 2);
        $table->timestamps();
    });
}

// database/migrations/YYYY_MM_DD_create_vaccines_table.php
public function up()
{
    Schema::create('vaccines', function (Blueprint $table) {
        $table->id();
        $table->string('vaccine');
        $table->date('date');
        $table->timestamps();
    });
}
