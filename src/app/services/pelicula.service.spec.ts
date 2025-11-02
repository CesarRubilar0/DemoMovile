import { TestBed } from '@angular/core/testing';
import { PeliculaService } from './pelicula.service';

describe('PeliculaService', () => {
  let service: PeliculaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeliculaService);
    localStorage.removeItem('demo_pelis_peliculas');
  });

  it('should have seed peliculas', () => {
    const list = service.getPeliculas();
    expect(list.length).toBeGreaterThan(0);
  });

  it('should add, update and delete pelicula', () => {
    const nueva = service.addPelicula({ titulo: 'Test', descripcion: 'd', puntuacion: 3 });
    expect(nueva.id).toBeGreaterThan(0);
    const updated = service.updatePelicula(nueva.id, { puntuacion: 4 });
    expect(updated).toBeTrue();
    service.deletePelicula(nueva.id);
    const found = service.getPeliculaById(nueva.id);
    expect(found).toBeUndefined();
  });
});
