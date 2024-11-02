function dibujarTriangulo(lado1, lado2, lado3, angulo1, angulo2, angulo3) {
    // Calculamos los vértices del triángulo usando la ley de cosenos
    const escala = 200 / Math.max(lado1, lado2, lado3); // Factor de escala para ajustar el tamaño
    
    // Punto A en el origen
    const Ax = 50;
    const Ay = 250;
    
    // Punto B a la derecha de A
    const Bx = Ax + lado1 * escala;
    const By = Ay;
    
    // Punto C usando trigonometría
    const Cx = Ax + lado2 * Math.cos(angulo1 * Math.PI / 180) * escala;
    const Cy = Ay - lado2 * Math.sin(angulo1 * Math.PI / 180) * escala;

    // Crear el SVG
    const svg = `
    <div style="position: relative; width: 300px; text-align: center;">
        <strong style="position: absolute; top: 0; left: 50%; transform: translateX(-50%);">Grafico</strong>
        <svg viewBox="0 0 300 300" width="300" height="300">
            <!-- Triángulo -->
            <path d="M${Ax},${Ay} L${Bx},${By} L${Cx},${Cy} Z" 
                  fill="none" 
                  stroke="black" 
                  stroke-width="2"/>
            
            <!-- Puntos de los vértices -->
            <circle cx="${Ax}" cy="${Ay}" r="3" fill="black"/>
            <circle cx="${Bx}" cy="${By}" r="3" fill="black"/>
            <circle cx="${Cx}" cy="${Cy}" r="3" fill="black"/>
            
            <!-- Etiquetas de los vértices -->
            <text x="${Ax-15}" y="${Ay+20}" class="angle-label">A</text>
            <text x="${Bx+10}" y="${By+20}" class="angle-label">B</text>
            <text x="${Cx-5}" y="${Cy-10}" class="angle-label">C</text>
            
            <!-- Etiquetas de los ángulos -->
            <text x="${Ax+10}" y="${Ay-10}" class="angle-label">${angulo1.toFixed(1)}°</text>
            <text x="${Bx-30}" y="${By-10}" class="angle-label">${angulo2.toFixed(1)}°</text>
            <text x="${Cx-20}" y="${Cy+20}" class="angle-label">${angulo3.toFixed(1)}°</text>
            
            <!-- Etiquetas de los lados -->
            <text x="${(Ax+Bx)/2}" y="${By+20}" class="side-label">${lado1.toFixed(1)}</text>
            <text x="${(Ax+Cx)/2-20}" y="${(Ay+Cy)/2}" class="side-label">${lado2.toFixed(1)}</text>
            <text x="${(Bx+Cx)/2+10}" y="${(By+Cy)/2}" class="side-label">${lado3.toFixed(1)}</text>
        </svg>
    </div>
`;

document.getElementById('visualizacion').innerHTML = svg;
}






function calcularTriangulo() {
    // Obtener valores de los lados
    const lado1 = parseFloat(document.getElementById('lado1').value);
    const lado2 = parseFloat(document.getElementById('lado2').value);
    const lado3 = parseFloat(document.getElementById('lado3').value);
    
    const resultadosDiv = document.getElementById('resultados');
    

    // Validar que los valores sean números positivos
    if (isNaN(lado1) || isNaN(lado2) || isNaN(lado3) || 
        lado1 <= 0 || lado2 <= 0 || lado3 <= 0) {
        resultadosDiv.innerHTML = '<p class="error">Por favor, ingrese valores válidos positivos para todos los lados.</p>';
        return;
    }

    // Validar que los lados puedan formar un triángulo
    if (lado1 + lado2 <= lado3 || lado1 + lado3 <= lado2 || lado2 + lado3 <= lado1) {
        resultadosDiv.innerHTML = '<p class="error">Los lados proporcionados no pueden formar un triángulo.</p>';
        return;
    }

    // Calcular los ángulos usando la ley de cosenos
    const angulo1 = Math.acos((lado2*lado2 + lado3*lado3 - lado1*lado1)/(2*lado2*lado3)) * 180/Math.PI;
    const angulo2 = Math.acos((lado1*lado1 + lado3*lado3 - lado2*lado2)/(2*lado1*lado3)) * 180/Math.PI;
    const angulo3 = Math.acos((lado1*lado1 + lado2*lado2 - lado3*lado3)/(2*lado1*lado2)) * 180/Math.PI;
    

    // Determinar el tipo de triángulo según sus lados
    let tipoLados;
    if (lado1 === lado2 && lado2 === lado3) {
        tipoLados = "Equilátero";
    } else if (lado1 === lado2 || lado2 === lado3 || lado1 === lado3) {
        tipoLados = "Isósceles";
    } else {
        tipoLados = "Escaleno";
    }
    
    // Determinar el tipo de triángulo según sus ángulos
    let tipoAngulos;
    if (angulo1 === 90 || angulo2 === 90 || angulo3 === 90) {
        tipoAngulos = "Rectángulo";
    } else if (angulo1 > 90 || angulo2 > 90 || angulo3 > 90) {
        tipoAngulos = "Obtusángulo";
    } else {
        tipoAngulos = "Acutángulo";
    }
    
    // Mostrar resultados
    resultadosDiv.innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Lados:</strong> ${lado1.toFixed(2)}, ${lado2.toFixed(2)}, ${lado3.toFixed(2)}</p>
        <p><strong>Ángulos:</strong>
            <br>Ángulo 1: ${angulo1.toFixed(2)}°
            <br>Ángulo 2: ${angulo2.toFixed(2)}°
            <br>Ángulo 3: ${angulo3.toFixed(2)}°
        </p>
        <p><strong>Clasificación según lados:</strong> ${tipoLados}</p>
        <p><strong>Clasificación según ángulos:</strong> ${tipoAngulos}</p>
    `;
    // Dibujar el triángulo
        dibujarTriangulo(lado1, lado2, lado3, angulo1, angulo2, angulo3);
}



