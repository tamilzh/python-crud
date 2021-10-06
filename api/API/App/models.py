from django.db import models

# Create your models here.

class Customers(models.Model):
    CustomerId = models.AutoField(primary_key=True)
    CustomerName = models.CharField(max_length=500)
    Plan = models.CharField(max_length=500)
    DateOfJoining = models.DateField()
    PhoneNumber = models.CharField(max_length=500)
    SetupBoxNumber = models.CharField(max_length=500)
    LastPaymentDate = models.CharField(max_length=500)

class PaymentDetails(models.Model):
    PaymentId = models.AutoField(primary_key=True)
    CustomerId = models.CharField(max_length=500)
    DateOfPayment = models.DateField()
    PaidAmount = models.CharField(max_length=500)