package com.treez.test.exception;

public class CommonEmptyResultException extends RuntimeException {
    public CommonEmptyResultException(String s) {
        super(s);
    }

    public CommonEmptyResultException(String s, Throwable throwable) {
        super(s, throwable);
    }

    public CommonEmptyResultException(Throwable throwable) {
        super(throwable);
    }
}
