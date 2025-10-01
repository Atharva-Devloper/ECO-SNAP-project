$body = @{
    email = "brandnew@test.com"
    password = "test123456"
    userType = "citizen"
    profile = @{
        firstName = "Brand"
        lastName = "New"
    }
} | ConvertTo-Json

Write-Host "Testing registration..."
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
Write-Host "Success!" -ForegroundColor Green
$response | ConvertTo-Json
