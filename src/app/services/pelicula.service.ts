import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Pelicula {
  id: number;
  titulo: string;
  descripcion?: string;
  puntuacion: number; // 0-5
  imagen?: string;
  genero?: string;
  ano?: number;
}

const STORAGE_KEY = 'demo_pelis_peliculas';

@Injectable({ providedIn: 'root' })
export class PeliculaService {
  private peliculas$ = new BehaviorSubject<Pelicula[]>(this.loadFromStorage());

  constructor() {}

  private loadFromStorage(): Pelicula[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed: Pelicula[] = this.getDefaultSeed();
        // Acción
      ;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    try {
      return JSON.parse(raw) as Pelicula[];
    } catch {
      return [];
    }
  }

  // Devuelve el array por defecto (seed) usado para inicializar el almacenamiento
  private getDefaultSeed(): Pelicula[] {
    return [
      // Acción
      { id: 1, titulo: 'Mad Max: Fury Road', descripcion: 'En un mundo postapocalíptico, una mujer rebelde y un guerrero solitario buscan la redención.', genero: 'Acción', ano: 2015, puntuacion: 5, imagen: '' },
      { id: 2, titulo: 'John Wick', descripcion: 'Un exasesino regresa al mundo criminal para vengar la muerte de su perro.', genero: 'Acción', ano: 2014, puntuacion: 4, imagen: '' },
      { id: 3, titulo: 'The Dark Knight', descripcion: 'Batman enfrenta al Joker, que sumerge a Gotham en el caos.', genero: 'Acción', ano: 2008, puntuacion: 5, imagen: '' },
      { id: 4, titulo: 'Die Hard', descripcion: 'Un policía lucha contra terroristas en un rascacielos durante una fiesta navideña.', genero: 'Acción', ano: 1988, puntuacion: 4, imagen: '' },
      { id: 5, titulo: 'The Matrix', descripcion: 'Un hacker descubre que el mundo es una simulación creada por máquinas.', genero: 'Acción', ano: 1999, puntuacion: 5, imagen: '' },

      // Comedia
      { id: 6, titulo: 'The Hangover', descripcion: 'Tres amigos despiertan después de una despedida de soltero en Las Vegas con una resaca épica.', genero: 'Comedia', ano: 2009, puntuacion: 4, imagen: '' },
      { id: 7, titulo: 'Superbad', descripcion: 'Dos amigos intentan conseguir alcohol para una fiesta antes de graduarse.', genero: 'Comedia', ano: 2007, puntuacion: 4, imagen: '' },
      { id: 8, titulo: 'Bridesmaids', descripcion: 'Una mujer compite con otra para ser la mejor amiga de la novia.', genero: 'Comedia', ano: 2011, puntuacion: 4, imagen: '' },
      { id: 9, titulo: 'Deadpool', descripcion: 'Un mercenario con poderes cura su cáncer y busca venganza.', genero: 'Comedia', ano: 2016, puntuacion: 5, imagen: '' },
      { id: 10, titulo: 'The Grand Budapest Hotel', descripcion: 'Un conserje y su joven amigo se ven envueltos en el robo de un valioso cuadro.', genero: 'Comedia', ano: 2014, puntuacion: 5, imagen: '' },

      // Drama
      { id: 11, titulo: 'The Shawshank Redemption', descripcion: 'Un banquero inocente es encarcelado y forma una amistad con otro preso.', genero: 'Drama', ano: 1994, puntuacion: 5, imagen: '' },
      { id: 12, titulo: 'Forrest Gump', descripcion: 'Un hombre con discapacidad intelectual vive eventos históricos de EE.UU.', genero: 'Drama', ano: 1994, puntuacion: 5, imagen: '' },
      { id: 13, titulo: 'The Pursuit of Happyness', descripcion: 'Un padre lucha por salir de la pobreza mientras cuida a su hijo.', genero: 'Drama', ano: 2006, puntuacion: 5, imagen: '' },
      { id: 14, titulo: 'A Beautiful Mind', descripcion: 'La historia de un matemático brillante que lucha contra la esquizofrenia.', genero: 'Drama', ano: 2001, puntuacion: 4, imagen: '' },
      { id: 15, titulo: 'The Social Network', descripcion: 'La creación de Facebook y las batallas legales que siguieron.', genero: 'Drama', ano: 2010, puntuacion: 5, imagen: '' },

      // Ciencia Ficción
      { id: 16, titulo: 'Inception', descripcion: 'Un ladrón de secretos corporativos usa la tecnología para infiltrarse en la mente de las personas.', genero: 'Ciencia Ficción', ano: 2010, puntuacion: 5, imagen: '' },
      { id: 17, titulo: 'Interstellar', descripcion: 'Un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar.', genero: 'Ciencia Ficción', ano: 2014, puntuacion: 5, imagen: '' },
      { id: 18, titulo: 'Blade Runner 2049', descripcion: 'Un oficial descubre un secreto que podría cambiar el destino de la humanidad.', genero: 'Ciencia Ficción', ano: 2017, puntuacion: 5, imagen: '' },
      { id: 19, titulo: 'The Martian', descripcion: 'Un astronauta queda varado en Marte y debe sobrevivir hasta ser rescatado.', genero: 'Ciencia Ficción', ano: 2015, puntuacion: 4, imagen: '' },
      { id: 20, titulo: 'Arrival', descripcion: 'Una lingüista intenta comunicarse con extraterrestres que han llegado a la Tierra.', genero: 'Ciencia Ficción', ano: 2016, puntuacion: 5, imagen: '' },

      // Terror
      { id: 21, titulo: 'The Conjuring', descripcion: 'Dos investigadores paranormales ayudan a una familia aterrorizada por una entidad.', genero: 'Terror', ano: 2013, puntuacion: 5, imagen: '' },
      { id: 22, titulo: 'Get Out', descripcion: 'Un hombre afroamericano descubre un siniestro secreto en la familia de su novia.', genero: 'Terror', ano: 2017, puntuacion: 5, imagen: '' },
      { id: 23, titulo: 'The Exorcist', descripcion: 'Una niña es poseída por un demonio, y dos sacerdotes intentan exorcizarla.', genero: 'Terror', ano: 1973, puntuacion: 5, imagen: '' },
      { id: 24, titulo: 'A Quiet Place', descripcion: 'Una familia debe vivir en silencio para evitar a criaturas que cazan por sonido.', genero: 'Terror', ano: 2018, puntuacion: 4, imagen: '' },
      { id: 25, titulo: 'The Shining', descripcion: 'Un escritor y su familia se mudan a un hotel embrujado.', genero: 'Terror', ano: 1980, puntuacion: 5, imagen: '' },

      // Animación
      { id: 26, titulo: 'Toy Story', descripcion: 'Los juguetes de un niño cobran vida cuando los humanos no los ven.', genero: 'Animación', ano: 1995, puntuacion: 5, imagen: '' },
      { id: 27, titulo: 'Spirited Away', descripcion: 'Una niña queda atrapada en un mundo de espíritus y debe encontrar la manera de regresar.', genero: 'Animación', ano: 2001, puntuacion: 5, imagen: '' },
      { id: 28, titulo: 'Up', descripcion: 'Un anciano y un niño explorador viajan en una casa flotante con globos.', genero: 'Animación', ano: 2009, puntuacion: 5, imagen: '' },
      { id: 29, titulo: 'Coco', descripcion: 'Un niño viaja al mundo de los muertos para descubrir el pasado de su familia.', genero: 'Animación', ano: 2017, puntuacion: 5, imagen: '' },
      { id: 30, titulo: 'The Lion King', descripcion: 'Un joven león debe reclamar su lugar como rey tras la muerte de su padre.', genero: 'Animación', ano: 1994, puntuacion: 5, imagen: '' },
    ];
  }

  // Fuerza la restauración del seed en localStorage y emite el nuevo valor
  resetSeed() {
    const seed = this.getDefaultSeed();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    this.peliculas$.next(seed);
    return seed;
  }

  private saveToStorage(list: Pelicula[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    this.peliculas$.next(list);
  }

  getPeliculas$(): Observable<Pelicula[]> {
    return this.peliculas$.asObservable();
  }

  getPeliculas(): Pelicula[] {
    return this.peliculas$.getValue();
  }

  getPeliculaById(id: number): Pelicula | undefined {
    return this.getPeliculas().find((p) => p.id === id);
  }

  addPelicula(payload: Omit<Pelicula, 'id'>) {
    const list = this.getPeliculas();
    const nextId = list.length ? Math.max(...list.map((p) => p.id)) + 1 : 1;
    const nueva: Pelicula = { id: nextId, ...payload };
    const newList = [nueva, ...list];
    this.saveToStorage(newList);
    return nueva;
  }

  updatePelicula(id: number, changes: Partial<Pelicula>) {
    const list = this.getPeliculas();
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...changes };
    this.saveToStorage([...list]);
    return true;
  }

  deletePelicula(id: number) {
    const list = this.getPeliculas();
    const newList = list.filter((p) => p.id !== id);
    this.saveToStorage(newList);
    return true;
  }
}
