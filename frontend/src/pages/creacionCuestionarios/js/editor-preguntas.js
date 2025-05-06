
let preguntas = [];

function agregarPregunta() {
  const contenedor = document.getElementById('contenedor-preguntas');

  const index = preguntas.length;
  const div = document.createElement('section');
  div.className = 'pregunta-block';
  div.dataset.index = index;

  const html = document.createElement('div');
  html.innerHTML = `
    <label>Enunciado:</label>
    <input type="text" placeholder="Texto de la pregunta" class="titulo">
    <label>Imagen del enunciado:</label>
    <input type="file" class="imagen-enunciado" accept="image/*">
    <label>Dificultad:</label>
    <select class="dificultad">
      <option value="facil">Fácil</option>
      <option value="intermedio">Intermedio</option>
      <option value="dificil">Difícil</option>
    </select>
    <div class="elementos"></div>
    <button type="button" onclick="agregarElemento(this)">+ Añadir elemento</button>
    <h4>Elementos creados:</h4>
    <div class="dropzone zona-creacion"></div>
    <h4>Arrastra aquí para definir la respuesta/s correcta:</h4>
    <div class="dropzone zona-correcta"></div>
  `;

  div.appendChild(html);
  contenedor.appendChild(div);
  preguntas.push({ elementos: [] });

  setDropzones(div);
}

function agregarElemento(btn) {
  const seccion = btn.closest('section');
  const index = seccion.dataset.index;
  const elementos = seccion.querySelector('.elementos');

  const div = document.createElement('div');
  div.className = 'elemento';

  const inputTexto = document.createElement('input');
  inputTexto.type = 'text';
  inputTexto.placeholder = 'Texto';

  const inputImg = document.createElement('input');
  inputImg.type = 'file';
  inputImg.accept = 'image/*';

  const obj = { texto: '', imagen: '', id: Date.now() + Math.random() };
  preguntas[index].elementos.push(obj);

  inputTexto.addEventListener('input', e => obj.texto = e.target.value);
  inputImg.addEventListener('change', e => {
    const reader = new FileReader();
    reader.onload = () => {
      obj.imagen = reader.result;
      actualizarZonaCreacion(seccion, preguntas[index].elementos);
    };
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  });

  div.appendChild(inputTexto);
  div.appendChild(inputImg);
  elementos.appendChild(div);
}

function actualizarZonaCreacion(seccion, lista) {
  const zona = seccion.querySelector('.zona-creacion');
  zona.innerHTML = '';
  lista.forEach(e => {
    const div = document.createElement('div');
    div.className = 'preview-item';
    div.draggable = true;
    div.dataset.id = e.id;

    if (e.imagen) {
      const img = document.createElement('img');
      img.src = e.imagen;
      div.appendChild(img);
    }

    const p = document.createElement('p');
    p.textContent = e.texto;
    div.appendChild(p);

    div.addEventListener('dragstart', () => div.classList.add('dragging'));
    div.addEventListener('dragend', () => div.classList.remove('dragging'));
    zona.appendChild(div);
  });
}

function setDropzones(context = document) {
  context.querySelectorAll('.dropzone').forEach(zona => {
    zona.addEventListener('dragover', e => e.preventDefault());
    zona.addEventListener('drop', e => {
      const dragging = document.querySelector('.dragging');
      if (dragging && zona !== dragging.parentNode) {
        zona.appendChild(dragging);
      }
    });
  });
}

function guardarTrabajo() {
  const grupo = document.getElementById('nombreGrupo').value.trim();
  const bloques = document.querySelectorAll('.pregunta-block');

  const cuestionario = [];

  bloques.forEach((bloque, i) => {
    const titulo = bloque.querySelector('.titulo').value.trim();
    const dificultad = bloque.querySelector('.dificultad').value;
    const imagenInput = bloque.querySelector('.imagen-enunciado');
    const imgFile = imagenInput.files[0];
    const imagen = imgFile ? URL.createObjectURL(imgFile) : '';

    const zonaCorrecta = bloque.querySelector('.zona-correcta');
    const ids = Array.from(zonaCorrecta.children).map(e => e.dataset.id);
    const todos = preguntas[i].elementos;

    const elementosMarcados = todos.map(e => ({
      ...e,
      correcto: ids.includes(e.id.toString())
    }));

    cuestionario.push({
      grupo, titulo, dificultad,
      imagenEnunciado: imagen,
      elementos: elementosMarcados
    });
  });

  localStorage.setItem('cuestionarioCompleto', JSON.stringify(cuestionario));
  document.getElementById('btn-preview').disabled = false;
}
