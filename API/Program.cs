var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Demo_Policy",
        policy =>
        {
            policy.AllowAnyOrigin(); //mypage.com , www.mypage.net, http://mypage.net
            policy.AllowAnyHeader(); //application/json, application/xml, application/text, application/html
            policy.AllowAnyMethod(); //GET, POST, PUT, DELETE

        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});

app.Use(async (context, next) =>
{
    if (context.Request.Path == "/")
    {
        context.Response.Redirect("/swagger/index.html");
        return;
    }
    await next();

});


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("Demo_Policy");

app.Run();
