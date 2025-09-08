using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace MyProjectBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // podesavanje dependency injection obrasca
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MyProjectBackend", Version = "v1" });
            });

            /*
            //Dodavanje Race servisa i njegovog interfejsa u kontejner zavisnosti, prvo navodimo interfejs a zatim njegovu implementaciju
            services.AddScoped<IScopedRaceService, RaceService>(); //Instanca servisa je ista u okviru jednog HTTP zahteva
            services.AddScoped<IScopedGetterService, GetterService>(); //Instanca servisa je ista u okviru jednog HTTP zahteva
            services.AddSingleton<ISingletonRaceService, RaceService>(); //Instanca servisa je ista uvek
            services.AddTransient<ITransientRaceService, RaceService>(); //Instanca servisa je razlicita uvek, cak i ukviru istog zahteva
            services.AddTransient<ITransientGetterService, GetterService>(); //Instanca servisa je razlicita uvek, cak i ukviru istog zahteva
        */
            }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // bitan redosled!!!
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyProjectBackend"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
