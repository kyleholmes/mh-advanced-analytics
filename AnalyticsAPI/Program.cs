using AdvancedAnalyticsAPI.Common;
using AdvancedAnalyticsAPI.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(p => p.AddPolicy("AllowLocal", builder => builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader()));

builder.Services.AddDbContext<ArchitectMainContext>(options => options.UseSqlServer(GetArchitectMainConnectionString()));

builder.Services.AddScoped<AppInsightsService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowLocal");

app.UseAuthorization();

app.MapControllers();

app.Run();

string GetArchitectMainConnectionString()
{
    SqlConnectionStringBuilder architectMainConnectionStringBuilder = new()
    {
        DataSource = configuration["DBServer"],
        InitialCatalog = "ArchitectMain",
        UserID = configuration["DBUser"],
        Password = configuration["DBPassword"],
        ConnectTimeout = 120000,
        ConnectRetryCount = 5,
        ConnectRetryInterval = 5,
        ApplicationName = "Analytics",
        MinPoolSize = 1,
        Pooling = true
    };

    return architectMainConnectionStringBuilder.ConnectionString + ";";
}