
using FluentValidation.AspNetCore;
using IsgNext.WebApi.Filters;
using Microsoft.OpenApi.Models;
using BES.Infrastructure.Persistence;
using BES.Application.Common.Interfaces;
using BES.WebApi.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// Add services to the container.
builder.Configuration.AddEnvironmentVariables();
builder.Configuration.AddUserSecrets<Program>(true);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers(options =>
                                options.Filters.Add<ApiExceptionFilterAttribute>())
                                .AddFluentValidation(x => x.AutomaticValidationEnabled = false)
.AddJsonOptions(o => o.JsonSerializerOptions
                .ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddSingleton<ICurrentUserService, CurrentUserService>();

builder.Services.AddCors(options =>
{
    var origins = builder.Configuration["CorsOrigins"];
    options.AddPolicy(name: "AllowSpecific",
                      policy =>
                      {
                          policy.WithOrigins(origins.Split(","))
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
                      });
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "BES Management",
        Version = "v1"
    });
    
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new string[] {}
        }
    });
});

builder.Services.AddControllers().AddJsonOptions(options => 
{ 
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c => 
{
    c.RoutePrefix = "swagger";
    // c.SwaggerEndpoint("/swagger/v1/swagger.json", "BES Management v1");
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();
    await initialiser.InitialiseAsync();
    await initialiser.SeedAsync();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.UseCors("AllowSpecific");

app.Run();
public partial class Program { } // this part
