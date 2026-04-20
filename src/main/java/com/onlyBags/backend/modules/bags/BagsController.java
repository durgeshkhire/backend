package com.onlyBags.backend.modules.bags;

import com.onlyBags.backend.entity.Bags;
import com.onlyBags.backend.entity.enums.Color;
import com.onlyBags.backend.entity.enums.Tag;
import com.onlyBags.backend.entity.enums.Type;
import lombok.RequiredArgsConstructor;
import org.hibernate.mapping.Bag;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bags")
@CrossOrigin(origins = "http://localhost:5173")
public class BagsController {

    private final BagsService bagsService;

    @PostMapping("add-bag")
    public Bags addBag(@RequestBody Bags bags){
        return bagsService.addBag(bags);
    }

    @GetMapping
    public List<Bags> getAllBags(){
        return bagsService.getAllBags();
    }

    @GetMapping("/{id}")
    public Bags getById(@PathVariable UUID id) {
        return bagsService.getBagById(id);
    }

    @PutMapping("/{id}")
    public Bags update(@PathVariable UUID id, @RequestBody Bags bag) {
        return bagsService.updateBag(id, bag);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable UUID id) {
        bagsService.deleteBag(id);
        return "Bag deleted successfully";
    }


    @GetMapping("/type/{type}")
    public List<Bags> getByType(@PathVariable Type type) {
        return bagsService.getByType(type);
    }

    @GetMapping("/tag/{tag}")
    public List<Bags> getByTag(@PathVariable Tag tag) {
        return bagsService.getByTag(tag);
    }

    @GetMapping("/color/{color}")
    public List<Bags> getByColor(@PathVariable Color color) {
        return bagsService.getByColor(color);
    }

}
