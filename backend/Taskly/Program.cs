using Taskly.Api;
using Taskly.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.AddDatabase();
builder.AddApiConfiguration();

var app = builder.Build();

app.UseApiConfiguration();

await app.MigrateDatabase();

app.RegisterEndpoints();

app.Run();
