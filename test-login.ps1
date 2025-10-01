$body = @{
    email = "citizen@ecosnap.com"
    password = "citizen123"
} | ConvertTo-Json

Write-Host "Testing login..."
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
    Write-Host "Login Success!" -ForegroundColor Green
    Write-Host "Token: $($response.token)" -ForegroundColor Cyan
    Write-Host "User: $($response.user.email)" -ForegroundColor Cyan
    $response | ConvertTo-Json
} catch {
    Write-Host "Login Failed!" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
