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

import com.hackaCcr.models.Entidade;
import com.hackaCcr.repository.EntidadeRepository;

@RestController
public class EntidadeController {
	
	@Autowired
	private EntidadeRepository entidadeRepository;
	
    @RequestMapping(value = "/entidades", method = RequestMethod.GET)
    public List<Entidade> Get() {
        return entidadeRepository.findAll();
    }
    
    @RequestMapping(value = "/entidade/{id}", method = RequestMethod.GET)
    public ResponseEntity<Entidade> GetById(@PathVariable(value = "id") long id)
    {
        Optional<Entidade> entidade = entidadeRepository.findById(id);
        if(entidade.isPresent())
            return new ResponseEntity<Entidade>(entidade.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @RequestMapping(value = "/pessoa", method =  RequestMethod.POST)
    
    public Entidade Post(@Valid @RequestBody Entidade pessoa)
    {
        return entidadeRepository.save(pessoa);
    }
	
    
    @RequestMapping(value = "/pessoa/{id}", method =  RequestMethod.PUT)
    public ResponseEntity<Entidade> Put(@PathVariable(value = "id") long id, @Valid @RequestBody Entidade newEntidade)
    {
        Optional<Entidade> oldEntidade = entidadeRepository.findById(id);
        if(oldEntidade.isPresent()){
        	Entidade entidade = oldEntidade.get();
        	entidade.setNome(newEntidade.getNome());
        	entidadeRepository.save(entidade );
            return new ResponseEntity<Entidade>(entidade, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @RequestMapping(value = "/entidade/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> Delete(@PathVariable(value = "id") long id)
    {
        Optional<Entidade> entidade = entidadeRepository.findById(id);
        if(entidade.isPresent()){
        	entidadeRepository.delete(entidade.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
	
	
}
