from django.contrib import admin

from .models import Calculation



class CalculationAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'rate', 'NPV', 'data')

admin.site.register(Calculation, CalculationAdmin)
