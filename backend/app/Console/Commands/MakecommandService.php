<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakecommandService extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a new service class in App\Services';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $name = $this->argument('name');
        $servicePath = app_path("Services/{$name}.php");

        if(file_exists($servicePath)){
            $this->error("Service {$name} already Exist");
            return Command::FAILURE;
        }

        $stub = $this->getStub();
        $stub = str_replace('{{ class }}',$name, $stub);
        $stub = str_replace('{{ namespace }}', 'App\Services', $stub);

        file_put_contents($servicePath, $stub);

        $this->info("Service {$name} Created Successfully");
        return Command::SUCCESS;
    }

    protected function getStub()
    {
        return file_get_contents(base_path('stubs/service.stub'));
    }
    
}