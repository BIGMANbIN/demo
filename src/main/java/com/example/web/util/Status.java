package com.example.web.util;

public enum Status {

    NORMAL(1),LOCK(0);

    private Integer value;
     Status(Integer value){
        this.value=value;
    }

    public Integer getValue() {
        return value;
    }
}
