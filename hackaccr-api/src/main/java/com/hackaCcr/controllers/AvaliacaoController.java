package com.hackaCcr.controllers;

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

import com.hackaCcr.models.Avaliacao;

import com.hackaCcr.repository.AvaliacaoRepository;


public class AvaliacaoController {

	@Autowired
	private AvaliacaoRepository avaliacaoRepository;
	
    @RequestMapping(value = "/avaliacoes", method = RequestMethod.GET)
    public List<Avaliacao> Get() {
        return avaliacaoRepository.findAll();
    }
    
    @RequestMapping(value = "/avaliacao/{id}", method = RequestMethod.GET)
    public ResponseEntity<Avaliacao> GetById(@PathVariable(value = "id") long id)
    {
        Optional<Avaliacao> avaliacao = avaliacaoRepository.findById(id);
        if(avaliacao.isPresent())
            return new ResponseEntity<Avaliacao>(avaliacao.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @RequestMapping(value = "/avaliacao", method =  RequestMethod.POST)
    
    public Avaliacao Post(@Valid @RequestBody Avaliacao avaliacao)
    {
        return avaliacaoRepository.save(avaliacao);
    }
	
    
    
    @RequestMapping(value = "/avaliacao/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> Delete(@PathVariable(value = "id") long id)
    {
        Optional<Avaliacao> avaliacao = avaliacaoRepository.findById(id);
        if(avaliacao.isPresent()){
        	avaliacaoRepository.delete(avaliacao.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
