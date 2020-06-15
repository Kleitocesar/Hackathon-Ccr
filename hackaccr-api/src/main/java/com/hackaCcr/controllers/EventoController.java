package com.hackaCcr.controllers;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hackaCcr.models.Evento;
import com.hackaCcr.repository.EventoRepository;

@RestController
public class EventoController {

	@Autowired
	private EventoRepository eventoRepository;

/*	@RequestMapping(value = "/evento/{idUsuario}", method = RequestMethod.GET)
	public ResponseEntity<Evento> GetByIdUsuario(@PathVariable(value = "idUsuario") long idUsuario) {
		Optional<Evento> evento = eventoRepository.findByIdUsuario(idUsuario);
		if (evento.isPresent())
			return new ResponseEntity<Evento>(evento.get(), HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
*/
	@RequestMapping(value = "/evento", method = RequestMethod.POST)

	public Evento Post(@Valid @RequestBody Evento evento) {
		return eventoRepository.save(evento);
	}

	@RequestMapping(value = "/evento/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> Delete(@PathVariable(value = "id") long id) {
		Optional<Evento> evento = eventoRepository.findById(id);
		if (evento.isPresent()) {
			eventoRepository.delete(evento.get());
			return new ResponseEntity<>(HttpStatus.OK);
		} else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
