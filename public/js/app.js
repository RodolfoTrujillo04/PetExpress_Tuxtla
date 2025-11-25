// Efectos adicionales
document.addEventListener('DOMContentLoaded', function() {
    console.log('App.js cargado - Efectos activos');
    
    // Agregar efectos hover a los botones
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});