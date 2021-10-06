from rest_framework import serializers
from App.models import Customers, PaymentDetails


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customers 
        fields=('CustomerId','CustomerName', 'PhoneNumber', 'SetupBoxNumber', 'Plan', 'LastPaymentDate')

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model=PaymentDetails 
        fields=('PaymentId','CustomerId', 'DateOfPayment', 'PaidAmount')