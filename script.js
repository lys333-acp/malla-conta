document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el contenedor principal donde se mostrará el pensum.
    const pensumContainer = document.getElementById('pensum-container');

    // Carga los datos del archivo JSON.
    fetch('pensum.json')
        .then(response => {
            // Verifica si la solicitud fue exitosa.
            if (!response.ok) {
                throw new Error('Error al cargar el archivo pensum.json');
            }
            return response.json();
        })
        .then(data => {
            // Itera sobre cada semestre en los datos del pensum.
            data.semestres.forEach(semestre => {
                // Crea un div para el semestre.
                const semesterDiv = document.createElement('div');
                semesterDiv.classList.add('semester');

                // Crea y añade el título del semestre (ej. "Semestre 1").
                const semesterTitle = document.createElement('h2');
                semesterTitle.textContent = `Semestre ${semestre.semestre}`;
                semesterDiv.appendChild(semesterTitle);

                // Crea una grilla para las asignaturas del semestre.
                const subjectsGrid = document.createElement('div');
                subjectsGrid.classList.add('subjects-grid');

                // Itera sobre cada asignatura del semestre actual.
                semestre.asignaturas.forEach(asignatura => {
                    // Crea una tarjeta para la asignatura.
                    const subjectCard = document.createElement('div');
                    subjectCard.classList.add('subject-card');

                    // Crea y añade el nombre de la asignatura.
                    const subjectName = document.createElement('h3');
                    subjectName.textContent = asignatura.nombre;
                    subjectCard.appendChild(subjectName);

                    // Crea y añade el código de la asignatura.
                    const subjectCode = document.createElement('p');
                    subjectCode.textContent = `Código: ${asignatura.codigo}`;
                    subjectCard.appendChild(subjectCode);

                    // Crea y añade los créditos de la asignatura.
                    const subjectCredits = document.createElement('p');
                    subjectCredits.textContent = `Créditos: ${asignatura.creditos}`;
                    subjectCard.appendChild(subjectCredits);

                    // Si la asignatura tiene prelaciones, las añade.
                    if (asignatura.prelaciones.length > 0) {
                        const subjectPrelaciones = document.createElement('p');
                        subjectPrelaciones.classList.add('prelaciones');
                        subjectPrelaciones.textContent = `Prelación: ${asignatura.prelaciones.join(', ')}`;
                        subjectCard.appendChild(subjectPrelaciones);
                    }
                    
                    // Añade la tarjeta de la asignatura a la grilla.
                    subjectsGrid.appendChild(subjectCard);
                });

                // Añade la grilla de asignaturas al div del semestre.
                semesterDiv.appendChild(subjectsGrid);
                // Añade el div del semestre al contenedor principal.
                pensumContainer.appendChild(semesterDiv);
            });
        })
        .catch(error => {
            // Muestra un error en la consola y en la página si el JSON no se puede cargar.
            console.error('Error:', error);
            pensumContainer.innerHTML = `<p style="text-align: center; color: red;">No se pudo cargar el plan de estudios. Por favor, revisa la consola para más detalles.</p>`;
        });
});
