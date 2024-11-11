using System.Text;
using Application.Common.Interfaces;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Repository;
using BES.Application.Common.Repository.Clients;
using BES.Domain.Enums;
using BES.Infrastructure.Files;
using BES.Infrastructure.Identity;
using BES.Infrastructure.Persistence;
using BES.Infrastructure.Persistence.Interceptors;
using BES.Infrastructure.Repository;
using BES.Infrastructure.Repository.Clients;
using BES.Infrastructure.Services;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                sqlServerOptionsAction: sqlOption =>
                {
                    sqlOption.EnableRetryOnFailure(
                        maxRetryCount: 10,
                        maxRetryDelay: TimeSpan.FromMilliseconds(30),
                        errorNumbersToAdd: null
                    );
                }
            )
        );
        
        // Add Repository
        services.AddSingleton<ISqlServerRepository, SqlServerRepository>(serviceProvider =>
        {
            return new SqlServerRepository(configuration.GetConnectionString("DefaultConnection"));
        });
        services.AddScoped<IClientRepository, ClientRepository>();

        services.AddScoped<AuditableEntitySaveChangesInterceptor>();
        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
        services.AddScoped<ApplicationDbContextInitialiser>();
        services.AddDefaultIdentity<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IMailClientService, MailClientService>();
        services.AddScoped<IDomainEventService, DomainEventService>();
        services.AddScoped<IFileStorageService, FileStorageService>();

        services.AddTransient<IDateTime, DateTimeService>();
        services.AddTransient<ICsvFileBuilder, CsvFileBuilder>();
        services.AddTransient<IIdentityService, IdentityService>();

        // Adding Authentication
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        // Adding Jwt Bearer
        .AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidAudience = configuration["JWT:ValidAudience"],
                ValidIssuer = configuration["JWT:ValidIssuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
            };
        });

        // Add Role Policy
        services.AddAuthorization(options =>
        {
            options.AddPolicy(UserRoles.Admin, policy => policy.RequireClaim(UserRoles.Admin));
            options.AddPolicy(UserRoles.User, policy => policy.RequireClaim(UserRoles.User));
            options.AddPolicy(UserRoles.Pricing, policy => policy.RequireClaim(UserRoles.Pricing));
        });

        return services;
    }
}
