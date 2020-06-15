package com.
hackaCcr.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.hackaCcr.models.Sensores;

import com.hackaCcr.repository.SensoresRepository;

@RestController
public class SensoresController {
	
    @Autowired
	private SensoresRepository sensoresRepository;
	

    @RequestMapping(value = "/sensores/{idUsuario}", method = RequestMethod.GET)
    public ResponseEntity<Sensores> GetById(@PathVariable(value = "idUsuario") long id)
    {
        Optional<Sensores> sensores = sensoresRepository.findByIdUsuario(id);
        if(sensores.isPresent())
            return new ResponseEntity<Sensores>(sensores.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @RequestMapping(value = "/sensores", method =  RequestMethod.POST)
    
    public Sensores Post(@Valid @RequestBody Sensores sensores)
    {
        return sensoresRepository.save(sensores);
    }
	
    
	
}
