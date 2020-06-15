package com.hackaCcr.controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.hackaCcr.models.Beneficio;
import com.hackaCcr.repository.BeneficioRepository;

public class BeneficioController {
	
	@Autowired
	private BeneficioRepository beneficioRepository;
	
    @RequestMapping(value = "/beneficios", method = RequestMethod.GET)
    public List<Beneficio> Get() {
        return beneficioRepository.findByVigentes(new Date());
    }
    
    @RequestMapping(value = "/beneficio/{id}", method = RequestMethod.GET)
    public ResponseEntity<Beneficio> GetById(@PathVariable(value = "id") long id)
    {
        Optional<Beneficio> beneficio = beneficioRepository.findById(id);
        if(beneficio.isPresent())
            return new ResponseEntity<Beneficio>(beneficio.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @RequestMapping(value = "/beneficio", method =  RequestMethod.POST)
    
    public Beneficio Post(@Valid @RequestBody Beneficio benficio)
    {
        return beneficioRepository.save(benficio);
    }
	
    
    
    @RequestMapping(value = "/beneficio/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> Delete(@PathVariable(value = "id") long id)
    {
        Optional<Beneficio> beneficio = beneficioRepository.findById(id);
        if(beneficio.isPresent()){
        	beneficioRepository.delete(beneficio.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
	
}
